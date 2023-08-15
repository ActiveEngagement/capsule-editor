<script lang="ts" setup>
import { Action, Diagnostic, forceLinting } from '@codemirror/lint';
import { EditorView } from '@codemirror/view';
import { ChevronLeftIcon, ChevronRightIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline';
import { AnimateCss } from '@vue-interface/animate-css';
import { Btn } from '@vue-interface/btn';
import { BtnDropdown } from '@vue-interface/btn-dropdown';
import { Rule } from 'capsule-lint';
import { Ref, computed, ref } from 'vue';
import EditorError from './EditorError.vue';

const props = withDefaults(defineProps<{
    saveButton?: boolean,
    saveButtonLabel?: string,
    view?: EditorView
}>(), {
    saveButton: true,
    saveButtonLabel: 'Save Changes',
    view: undefined
});

const emit = defineEmits<{
    'goto': [Diagnostic, Diagnostic|undefined]
    'update:modelValue': [Ref<Diagnostic[]>]
    'save': []
}>();

const currentDiagnostic = ref<Diagnostic & { rule: Rule }>();
const diagnostics = ref<Diagnostic[]>([]);
const hasLinted = ref(false);

const index = computed(() => Math.max(0, currentDiagnostic.value ? diagnostics.value.indexOf(currentDiagnostic.value) : 0));

function goto(index: number) {
    if(index < 0) {
        index = diagnostics.value.length - 1;
    }
    else if(index > diagnostics.value.length - 1) {
        index = 0;
    }

    const lastDiagnostic = currentDiagnostic.value;
            
    currentDiagnostic.value = diagnostics.value[index] as Diagnostic & { rule: any };   

    emit('goto', currentDiagnostic.value, lastDiagnostic);
}

function compare(a: any, b: any) {
    return (!!a && !!b)
                && a.from === b.from
                && a.to === b.to
                && a.rule.id === b.rule.id;
}

function update(values: Diagnostic[]) {
    diagnostics.value = values;
    hasLinted.value = true;

    if(!currentDiagnostic.value) {
        currentDiagnostic.value = diagnostics.value[index.value] as Diagnostic & { rule: any };
    }

    emit('update:modelValue', diagnostics);
}
        
function activate(view: EditorView) {
    const { from, to } = view.state.selection.main;

    const active = diagnostics.value.filter((diagnostic: Diagnostic) => {
        if(from === to) {
            return diagnostic.from <= from && diagnostic.to >= to;
        }

        return diagnostic.from >= from && diagnostic.to <= to;
    });

    const match = diagnostics.value.find((diagnostic: Diagnostic) => {
        return compare(diagnostic, currentDiagnostic.value);
    });

    if(active.length) {
        const max = Math.max(0, currentDiagnostic.value ? active.indexOf(currentDiagnostic.value) : 0);
            
        currentDiagnostic.value = active[max] as Diagnostic & { rule: any };
    }
    else {
        currentDiagnostic.value = (match || diagnostics.value[index.value]) as Diagnostic & { rule: any };
    }
}

function onClickAction(diagnostic: Diagnostic, action: Action) {
    if(!props.view) {
        return;
    }
    
    action.apply(props.view, diagnostic.from, diagnostic.to);

    forceLinting(props.view);
}

defineExpose({
    activate,
    update
});
</script>

<template>
    <footer
        class="editor-footer">
        <animate-css
            name="fade"
            :duration="200">
            <div
                v-if="hasLinted"
                class="flex justify-between items-center w-full p-[.33rem]">
                <div class="flex items-center w-full overflow-hidden relative gap-2">
                    <div class="editor-footer-pager">
                        <div v-if="diagnostics?.length">
                            <btn
                                type="button"
                                variant="link"
                                @click="goto(index - 1)">
                                <ChevronLeftIcon class="w-4 h-4" />
                            </btn> 
                            <span>{{ index + 1 }} of {{ diagnostics.length }}</span>
                            <btn
                                type="button"
                                variant="link"
                                @click="goto(index + 1)">
                                <ChevronRightIcon class="w-4 h-4" />
                            </btn>
                        </div>
                    </div>
                    <button
                        v-if="currentDiagnostic"
                        type="button"
                        @click="goto(index)">
                        <ExclamationTriangleIcon
                            class="w-6 h-6" />
                    </button>
                    <div class="editor-footer-diagnostic">
                        <animate-css
                            name="fade"
                            :duration="200"
                            leave-active-class="position-absolute">
                            <EditorError
                                v-if="currentDiagnostic"
                                :key="index"
                                :error="currentDiagnostic" />
                        </animate-css>
                    </div>
                </div>
                <div class="editor-footer-action flex-shrink-0">
                    <slot name="before-save-button" />

                    <slot name="action-button">
                        <template v-if="currentDiagnostic && currentDiagnostic.actions?.length">
                            <template v-if="currentDiagnostic.actions.length === 1">
                                <btn
                                    type="button"
                                    variant="light"
                                    size="sm"
                                    class="flex items-center gap-2"
                                    @click="onClickAction(currentDiagnostic, currentDiagnostic.actions[0])">
                                    {{ currentDiagnostic.actions[0].name }}
                                </btn>
                            </template>
                            <template v-else>
                                <btn-dropdown
                                    label="Fix Errors"
                                    type="button"
                                    size="sm"
                                    variant="light"
                                    dropup>
                                    <button
                                        v-for="(action, i) in currentDiagnostic.actions"
                                        :key="`${currentDiagnostic.rule.id}-${i}`"
                                        type="button"
                                        variant="light"
                                        @click="onClickAction(currentDiagnostic, action)">
                                        {{ action.name }}
                                    </button>
                                </btn-dropdown>
                            </template>
                        </template>
                    </slot>

                    <slot
                        name="save-button"
                        :diagnostics="diagnostics"
                        :save-button-label="diagnostics">
                        <btn
                            v-if="saveButton && !diagnostics.length"
                            type="button"
                            variant="light"
                            size="sm"
                            @click="emit('save')">
                            {{ saveButtonLabel }}
                        </btn>
                    </slot>

                    <slot
                        name="after-save-button"
                        :diagnostics="diagnostics" />
                </div>
            </div>
        </animate-css>
    </footer>
</template>

<style>
.editor-footer {
    display: flex;
    align-items: center;
    color: white;
    position: relative;
    transition: .1s all ease-in;
}

.editor-footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem 0;
}

.editor-footer-error {
    display: flex;
    align-items: center;
    width: 100%;
    overflow: hidden;
    position: relative;
}

.editor-footer-icon {
    margin-right: .5rem;
}

.editor-footer-icon button {
    color: white;
    padding: 0 1rem;
}

.editor-footer-icon button:active {
    color: #e0e0e0;
}

.editor-footer-action-icon {
    margin-right: .25rem;
}

.editor-footer-diagnostic {
    font-weight: 300;
    font-size: .85em;
    overflow: hidden;
}
    
.editor-footer-pager {
    flex-shrink: 0;
    min-width: 10.5rem;
}

.editor-footer-pager  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 .5rem;
}

.editor-footer-pager .btn {
    padding: 0;
    color: white;
    width: 2rem;
    height: 1.75rem;
    font-size: 1.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: .6666rem;
    background: transparent;
    border: 0;
}

.editor-footer-pager .btn:active {
    background: rgba(0, 0, 0, .3);
}
</style>
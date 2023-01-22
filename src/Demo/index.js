import ErrorDetection from './ErrorDetection.vue';
import Finished from './Finished.vue';
import FixingErrors from './FixingErrors.vue';
import Paginating from './Paginating.vue';
import Welcome from './Welcome.vue';

export const steps = { 
    'welcome': Welcome,
    'error-detection': ErrorDetection,
    'paginating': Paginating,
    'fixing-errors': FixingErrors,
    'finished': Finished,
};
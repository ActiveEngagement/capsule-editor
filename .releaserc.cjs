require('dotenv').config();

module.exports = {
    branches: [
        'master',
        {
            name: 'beta',
            channel: 'beta',
            prerelease: true,
        },
    ],
    verifyConditions: [
        '@semantic-release/changelog',
        '@semantic-release/git',
        ['@semantic-release/github', { successComment: false, failTitle: false }],
    ],
    analyzeCommits: ['@semantic-release/commit-analyzer'],
    generateNotes: ['@semantic-release/release-notes-generator'],
    prepare: [
        ['@semantic-release/npm', { provenance: true }],
        '@semantic-release/changelog',
        [
            '@semantic-release/git',
            {
                assets: ['CHANGELOG.md', 'package.json'],
                message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
            },
        ],
    ],
    publish: [
        ['@semantic-release/npm', { provenance: true }],
        ['@semantic-release/github', { successComment: false, failTitle: false }],
    ],
    success: [
        ['@semantic-release/github', { successComment: false, failTitle: false }],
    ],
    fail: [
        ['@semantic-release/github', { successComment: false, failTitle: false }],
    ],
};

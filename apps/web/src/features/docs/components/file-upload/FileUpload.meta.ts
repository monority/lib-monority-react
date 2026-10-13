export const fileUploadMeta = {
    title: 'FileUpload',
    status: 'stable',
    package: '@monority/ui/file-upload',
    import: "import { FileUpload } from '@monority/ui'",
    category: 'forms',
    anatomy: ['root', 'dropZone', 'input', 'fileList', 'fileItem', 'removeButton', 'progress'],
    accessibility: [
        'Native input[type="file"] keyboard accessible via dropZone',
        'Drag and drop feedback announced to assistive technology',
        'Accessible file deletion actions with clear labels',
    ],
}

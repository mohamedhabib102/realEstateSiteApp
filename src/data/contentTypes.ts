// Shared editable-content types used by the Super Admin management interfaces.
// These mirror the structure of the public pages so the Laravel + Inertia backend
// can later bind each key to a real API field.

export interface Bilingual {
    en: string
    ar: string
}

export interface EditableField {
    key: string
    label: Bilingual
    type: 'text' | 'textarea'
    value: Bilingual
}

export interface EditableImage {
    key: string
    label: Bilingual
    value: string
}

export interface EditableSection {
    key: string
    label: Bilingual
    hint: Bilingual
    fields: EditableField[]
    images: EditableImage[]
}

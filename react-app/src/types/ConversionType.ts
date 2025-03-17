export type ConversionType = {
    id: number,
    sourceFile: number,
    resultFile: number | null,
    conversionType: 'noteToAudio' | 'aoudioToNote',
    createdAt: Date
}

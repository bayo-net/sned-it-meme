import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
    const templatesDir = path.join(process.cwd(), 'public', 'meme-templates')

    try {
        const files = fs.readdirSync(templatesDir)
        const templateFiles = files.filter((file) => file.endsWith('.png'))
        return NextResponse.json(templateFiles)
    } catch (error) {
        console.error('Failed to read template files:', error)
        return NextResponse.json(
            { error: 'Failed to read template files' },
            { status: 500 }
        )
    }
}

'use client'

import React, { useState, useRef, useEffect } from 'react'
import html2canvas from 'html2canvas'

interface TextElement {
    id: string
    content: string
    x: number
    y: number
    width: number
    height: number
    fontSize: number
    font: string
    color: 'black' | 'white'
}

interface DraggableResizableTextProps {
    text: TextElement
    onUpdate: (updatedText: TextElement) => void
    onDelete: (id: string) => void
    hideBorders: boolean
}

const fontOptions = [
    'Typewriter',
    'Times New Roman',
    'Comic Sans MS',
    'Impact',
    'Arial Black',
    'Montserrat',
    'Helvetica',
    'Myriad Pro',
]

const DraggableResizableText: React.FC<DraggableResizableTextProps> = ({
    text,
    onUpdate,
    onDelete,
    hideBorders,
}) => {
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [isResizing, setIsResizing] = useState<boolean>(false)
    const [startX, setStartX] = useState<number>(0)
    const [startY, setStartY] = useState<number>(0)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleMove = (clientX: number, clientY: number) => {
            if (isDragging) {
                const deltaX = clientX - startX
                const deltaY = clientY - startY
                onUpdate({
                    ...text,
                    x: text.x + deltaX,
                    y: text.y + deltaY,
                })
                setStartX(clientX)
                setStartY(clientY)
            } else if (isResizing) {
                const deltaX = clientX - startX
                const deltaY = clientY - startY
                const newWidth = Math.max(50, text.width + deltaX)
                const newHeight = Math.max(20, text.height + deltaY)
                onUpdate({
                    ...text,
                    width: newWidth,
                    height: newHeight,
                })
                setStartX(clientX)
                setStartY(clientY)
            }
        }

        const handleMouseMove = (e: MouseEvent) => {
            handleMove(e.clientX, e.clientY)
        }

        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0]
            handleMove(touch.clientX, touch.clientY)
        }

        const handleEnd = () => {
            setIsDragging(false)
            setIsResizing(false)
        }

        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleEnd)
            window.addEventListener('touchmove', handleTouchMove)
            window.addEventListener('touchend', handleEnd)
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleEnd)
            window.removeEventListener('touchmove', handleTouchMove)
            window.removeEventListener('touchend', handleEnd)
        }
    }, [isDragging, isResizing, text, onUpdate, startX, startY])

    const handleStart = (
        clientX: number,
        clientY: number,
        action: 'drag' | 'resize'
    ) => {
        setStartX(clientX)
        setStartY(clientY)
        if (action === 'drag') {
            setIsDragging(true)
        } else {
            setIsResizing(true)
        }
    }

    return (
        <div
            ref={textRef}
            className={`text-resizable ${hideBorders ? 'hide-borders' : ''}`}
            style={{
                position: 'absolute',
                left: `${text.x}px`,
                top: `${text.y}px`,
                width: `${text.width}px`,
                height: `${text.height}px`,
                cursor: isDragging ? 'grabbing' : 'grab',
                border: hideBorders ? 'none' : '2px solid black',
            }}
            onMouseDown={(e) => handleStart(e.clientX, e.clientY, 'drag')}
            onTouchStart={(e) => {
                const touch = e.touches[0]
                handleStart(touch.clientX, touch.clientY, 'drag')
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    fontSize: `${text.fontSize}px`,
                    fontFamily: text.font,
                    color: text.color,
                    textShadow:
                        text.color === 'white' ? '1px 1px 2px black' : 'none',
                    padding: '0',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    overflow: 'hidden',
                }}
            >
                {text.content}
            </div>
            <textarea
                value={text.content}
                onChange={(e) => onUpdate({ ...text, content: e.target.value })}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    resize: 'none',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontSize: `${text.fontSize}px`,
                    fontFamily: text.font,
                    color: 'transparent',
                    caretColor: text.color,
                    padding: '0',
                }}
            />
            {/* Resizing Handles */}
            {!hideBorders &&
                ['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(
                    (position) => (
                        <div
                            key={position}
                            style={{
                                position: 'absolute',
                                [position.split('-')[0]]: '-5px',
                                [position.split('-')[1]]: '-5px',
                                width: '10px',
                                height: '10px',
                                background: 'black',
                                cursor: 'nwse-resize',
                            }}
                            onMouseDown={(e) => {
                                e.stopPropagation()
                                handleStart(e.clientX, e.clientY, 'resize')
                            }}
                            onTouchStart={(e) => {
                                e.stopPropagation()
                                const touch = e.touches[0]
                                handleStart(
                                    touch.clientX,
                                    touch.clientY,
                                    'resize'
                                )
                            }}
                        />
                    )
                )}
            {!hideBorders && (
                <button
                    onClick={() => onDelete(text.id)}
                    style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '0',
                        background: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                    }}
                >
                    ×
                </button>
            )}
        </div>
    )
}

const MemeGeneratorPage: React.FC = () => {
    const [memeImage, setMemeImage] = useState<string | null>(null)
    const [texts, setTexts] = useState<TextElement[]>([])
    const [hideBorders, setHideBorders] = useState<boolean>(false)
    const memeRef = useRef<HTMLDivElement>(null)
    const [templates, setTemplates] = useState<string[]>([])

    const handleTemplateClick = (templateFile: string) => {
        setMemeImage(`/meme-templates/${templateFile}`)
    }

    useEffect(() => {
        // Fetch the list of templates from an API endpoint
        const fetchTemplates = async () => {
            try {
                const response = await fetch('/api/meme-templates')
                if (!response.ok) {
                    throw new Error('Failed to fetch templates')
                }
                const data = await response.json()
                setTemplates(data)
            } catch (error) {
                console.error('Error fetching templates:', error)
            }
        }

        fetchTemplates()
    }, [])

    const addNewText = () => {
        const newText: TextElement = {
            id: Date.now().toString(),
            content: 'New Text',
            x: 50,
            y: 50,
            width: 200,
            height: 50,
            fontSize: 20,
            font: 'Arial',
            color: 'black',
        }
        setTexts([...texts, newText])
    }

    const updateText = (updatedText: TextElement) => {
        setTexts(
            texts.map((text) =>
                text.id === updatedText.id ? updatedText : text
            )
        )
    }

    const deleteText = (id: string) => {
        setTexts(texts.filter((text) => text.id !== id))
    }

    const downloadMeme = () => {
        setHideBorders(true)
        setTimeout(() => {
            if (memeRef.current) {
                const outputSize = 600 // Fixed size for output
                const elementWidth = memeRef.current.offsetWidth
                const elementHeight = memeRef.current.offsetHeight
                const aspectRatio = elementWidth / elementHeight

                let captureWidth, captureHeight
                if (aspectRatio > 1) {
                    captureWidth = elementWidth
                    captureHeight = elementWidth / aspectRatio
                } else {
                    captureHeight = elementHeight
                    captureWidth = elementHeight * aspectRatio
                }

                html2canvas(memeRef.current, {
                    useCORS: true,
                    width: captureWidth,
                    height: captureHeight,
                    backgroundColor: null, // Ensure transparent background
                })
                    .then((canvas) => {
                        // Create a new square canvas
                        const outputCanvas = document.createElement('canvas')
                        outputCanvas.width = outputSize
                        outputCanvas.height = outputSize
                        const ctx = outputCanvas.getContext('2d')

                        if (ctx) {
                            // Fill the background with white
                            ctx.fillStyle = 'white'
                            ctx.fillRect(0, 0, outputSize, outputSize)

                            // Calculate positioning to center the image
                            const scale = Math.min(
                                outputSize / captureWidth,
                                outputSize / captureHeight
                            )
                            const x = (outputSize - captureWidth * scale) / 2
                            const y = (outputSize - captureHeight * scale) / 2

                            // Draw the captured image onto the new canvas, centered
                            ctx.drawImage(
                                canvas,
                                x,
                                y,
                                captureWidth * scale,
                                captureHeight * scale
                            )

                            outputCanvas.toBlob((blob) => {
                                if (blob) {
                                    const url = URL.createObjectURL(blob)
                                    const link = document.createElement('a')
                                    link.href = url
                                    link.download = 'meme.png'
                                    document.body.appendChild(link)
                                    link.click()
                                    document.body.removeChild(link)
                                    URL.revokeObjectURL(url)
                                }
                            }, 'image/png')
                        }
                    })
                    .catch((error: unknown) => {
                        console.error('Failed to capture meme image', error)
                        if (error instanceof Error) {
                            console.error('Error message:', error.message)
                        }
                    })
                    .finally(() => {
                        setHideBorders(false)
                    })
            }
        }, 100)
    }

    return (
        <div className="flex flex-col lg:flex-row items-start mx-auto my-4 lg:my-14 bg-secondaryColor font-[family-name:var(--font-gloriahallelujah-sans)] max-w-[1000px] px-4 lg:px-0">
            <section
                ref={memeRef}
                className="border-4 border-black w-full lg:w-[500px] h-[300px] lg:h-[500px] relative overflow-hidden flex-shrink-0 mb-4 lg:mb-0"
            >
                {memeImage && (
                    <img
                        src={memeImage}
                        alt="Meme template"
                        className="w-full h-full object-contain"
                    />
                )}
                {texts.map((text) => (
                    <DraggableResizableText
                        key={text.id}
                        text={text}
                        onUpdate={updateText}
                        onDelete={deleteText}
                        hideBorders={hideBorders}
                    />
                ))}
            </section>

            <section className="border-4 border-black w-full lg:w-auto p-4 lg:px-16 lg:py-10 lg:border-l-0 relative flex flex-col gap-4 justify-start h-auto lg:h-[500px] overflow-y-auto">
                <div className="flex flex-col gap-3">
                    <h1 className="text-2xl">Templates</h1>
                    <div className="flex flex-row gap-3 justify-center lg:justify-start flex-wrap overflow-y-auto max-h-[240px]">
                        {templates.map((template, index) => (
                            <div
                                key={index}
                                className="w-[80px] h-[80px] border-2 border-black cursor-pointer flex-shrink-0"
                                onClick={() => handleTemplateClick(template)}
                            >
                                <img
                                    src={`/meme-templates/${template}`}
                                    className="w-full h-full object-contain"
                                    alt={`Template ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-2xl">Text</h1>
                        <button
                            className="bg-primaryColor px-4 py-2 rounded-lg"
                            onClick={addNewText}
                        >
                            Add New Text
                        </button>
                    </div>
                    {texts.map((text) => (
                        <div key={text.id} className="flex flex-col gap-2">
                            <input
                                type="text"
                                value={text.content}
                                onChange={(e) =>
                                    updateText({
                                        ...text,
                                        content: e.target.value,
                                    })
                                }
                                className="flex-grow bg-white border border-gray-300 rounded px-2 py-1"
                            />
                            <div className="flex flex-row gap-2">
                                <select
                                    value={text.font}
                                    onChange={(e) =>
                                        updateText({
                                            ...text,
                                            font: e.target.value,
                                        })
                                    }
                                    className="bg-white border border-gray-300 rounded px-2 py-1"
                                >
                                    {fontOptions.map((font) => (
                                        <option key={font} value={font}>
                                            {font}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    value={text.fontSize}
                                    onChange={(e) =>
                                        updateText({
                                            ...text,
                                            fontSize: parseInt(e.target.value),
                                        })
                                    }
                                    className="w-20 bg-white border border-gray-300 rounded px-2 py-1"
                                    min="8"
                                    max="72"
                                />
                                <select
                                    value={text.color}
                                    onChange={(e) =>
                                        updateText({
                                            ...text,
                                            color: e.target.value as
                                                | 'black'
                                                | 'white',
                                        })
                                    }
                                    className="bg-white border border-gray-300 rounded px-2 py-1"
                                >
                                    <option value="black">Black</option>
                                    <option value="white">White</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="bg-primaryColor px-4 py-3 rounded-lg w-full lg:w-auto"
                    onClick={downloadMeme}
                >
                    Download Meme
                </button>
            </section>
        </div>
    )
}

export default MemeGeneratorPage

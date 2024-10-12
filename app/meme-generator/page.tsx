'use client'
import React, { useState, useRef, useEffect } from 'react'
import html2canvas from 'html2canvas'
import path from 'path'

interface TextElement {
    id: string
    content: string
    x: number
    y: number
    width: number
    height: number
    fontSize: number
    font: string
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
            <textarea
                value={text.content}
                onChange={(e) => onUpdate({ ...text, content: e.target.value })}
                style={{
                    width: '100%',
                    height: '100%',
                    resize: 'none',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontSize: `${text.fontSize}px`,
                    fontFamily: text.font,
                    color: 'black',
                    textShadow: 'none',
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
        // Temporarily hide borders and resize handles
        setHideBorders(true)
        setTimeout(() => {
            if (memeRef.current) {
                html2canvas(memeRef.current, { useCORS: true, scale: 2 })
                    .then((canvas) => {
                        // Convert canvas to blob
                        canvas.toBlob((blob) => {
                            if (blob) {
                                // Create object URL
                                const url = URL.createObjectURL(blob)

                                // Create temporary link and trigger download
                                const link = document.createElement('a')
                                link.href = url
                                link.download = 'meme.png'
                                document.body.appendChild(link)
                                link.click()
                                document.body.removeChild(link)

                                // Clean up object URL
                                URL.revokeObjectURL(url)
                            }
                        }, 'image/png')
                    })
                    .catch((error: any) => {
                        console.error('Failed to capture meme image', error)
                    })
                    .finally(() => {
                        setHideBorders(false)
                    })
            }
        }, 100)
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

    return (
        <div className="flex flex-col lg:flex-row items-start mx-auto my-4 lg:my-14 bg-secondaryColor font-[family-name:var(--font-gloriahallelujah-sans)] max-w-[1000px] px-4 lg:px-0">
            {/* Left Section - Meme Generator */}
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

            {/* Right Section */}
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
                    {texts.map((text, index) => (
                        <div
                            key={text.id}
                            className="flex flex-row items-center gap-2"
                        >
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

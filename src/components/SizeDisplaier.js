import React from 'react'

function SizeDisplaier({ files }) {
    const maxFilesSize = 1000
    const FilesSizeInKB = (files) => {
        var totalSize = 0
        files.map((file, index) => (
            totalSize += file.size
        ))

        return (totalSize / 1024).toFixed(2)
    }

    const getColorClass = (sizeInKB) => {        
        const colors = [
            "text-white",
            "text-red-50",
            "text-red-100",
            "text-red-200",
            "text-red-300",
            "text-red-400",
            "text-red-500",
            "text-red-600"
        ]        
        const shiftColorThreshold = maxFilesSize / colors.length
        const colorIndex = Math.min(Math.floor(sizeInKB / shiftColorThreshold), colors.length - 1)
        return colors[colorIndex]
    }

    return (
        <div className="text-center">
            <p className={`text-4xl font-bold ${getColorClass(FilesSizeInKB(files))}`}>
                {FilesSizeInKB(files)} / {maxFilesSize} KB
            </p>
            <p className="text-sm text-gray-500">
                Total file size
            </p>
        </div>
    )
}

export default SizeDisplaier

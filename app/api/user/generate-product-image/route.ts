import { NextRequest, NextResponse } from "next/server";
import { imagekit } from "@/lib/imagekit";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;
        const imageUrl = formData.get('imageUrl') as string | null;
        const description = formData.get('description') as string | null;
        const size = formData.get('size') as string | null;

        const receivedKeys = Array.from(formData.keys());
        const receivedFileMeta = file ? { name: file.name, type: file.type, size: file.size } : null;
        console.log('generate-product-image formData keys:', receivedKeys);
        console.log('generate-product-image file meta:', receivedFileMeta);

        if (!file && !imageUrl) {
            return NextResponse.json(
                { error: "No file or imageUrl provided" },
                { status: 400 }
            );
        }

        let finalImageUrl: string;

        if (file) {
            // Upload product image file to ImageKit
            const arrayBuffer = await file.arrayBuffer();
            const base64 = Buffer.from(arrayBuffer).toString("base64");

            const imagekitResponse = await imagekit.upload({
                file: base64,
                fileName: Date.now() + ".png",
                isPublished: true,
            });

            finalImageUrl = imagekitResponse.url;
        } else {
            // imageUrl points to a local public asset (e.g. "/juice-can.png").
            // Read it from disk and upload to ImageKit so we always return an ImageKit URL.
            const relativePath = (imageUrl as string).replace(/^\//, "");
            const filePath = path.join(process.cwd(), "public", relativePath);
            const fileBuffer = await fs.readFile(filePath);
            const base64 = fileBuffer.toString("base64");

            const imagekitResponse = await imagekit.upload({
                file: base64,
                fileName: relativePath || Date.now() + ".png",
                isPublished: true,
            });

            finalImageUrl = imagekitResponse.url;
        }

        console.log('Image uploaded/used:', {
            url: finalImageUrl,
            description,
            size,
        });

        // TODO: call your AI image generation here using finalImageUrl, description, size
        return NextResponse.json({
            imageUrl: finalImageUrl,
            received: {
                keys: receivedKeys,
                file: receivedFileMeta,
                imageUrl,
            },
        });
    } catch (error: any) {
        console.error('Error in /api/user/generate-product-image:', error);
        return NextResponse.json(
            {
                error: "Failed to upload image to ImageKit",
                details: error?.message,
            },
            { status: 500 }
        );
    }
} 
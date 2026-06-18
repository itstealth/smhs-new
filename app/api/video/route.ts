import { NextRequest, NextResponse } from "next/server";
import { createReadStream, statSync } from "fs";
import { join } from "path";
import { Readable } from "stream";

const CHUNK_SIZE = 512 * 1024; // 512 KB chunks — ~1.2 s of video at 3.3 Mbps

export async function GET(request: NextRequest) {
  const filePath = join(process.cwd(), "public", "SMHS-website_banner.mp4");

  let size: number;
  try {
    ({ size } = statSync(filePath));
  } catch {
    return new NextResponse("Video not found", { status: 404 });
  }

  const rangeHeader = request.headers.get("range");

  if (rangeHeader) {
    const [, range] = rangeHeader.split("=");
    const [startStr, endStr] = range.split("-");
    const start = parseInt(startStr, 10);
    const end = endStr ? parseInt(endStr, 10) : Math.min(start + CHUNK_SIZE - 1, size - 1);
    const chunkSize = end - start + 1;

    const webStream = Readable.toWeb(
      createReadStream(filePath, { start, end })
    ) as ReadableStream;

    return new NextResponse(webStream, {
      status: 206,
      headers: {
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": String(chunkSize),
        "Content-Type": "video/mp4",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // No range header — return full file with Accept-Ranges so the browser
  // immediately switches to range requests on subsequent loads.
  const webStream = Readable.toWeb(
    createReadStream(filePath)
  ) as ReadableStream;

  return new NextResponse(webStream, {
    status: 200,
    headers: {
      "Accept-Ranges": "bytes",
      "Content-Length": String(size),
      "Content-Type": "video/mp4",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

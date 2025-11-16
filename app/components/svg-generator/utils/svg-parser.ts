import type { SvgData, PathElement } from "../svg-editor";

/**
 * SVGコードをパースしてSvgDataオブジェクトに変換する
 */
export function parseSvgCode(svgCode: string): SvgData {
  if (!svgCode.trim()) {
    return getDefaultSvgData();
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(svgCode, "image/svg+xml");
  const svgElement = doc.querySelector("svg");

  if (!svgElement) {
    return getDefaultSvgData();
  }

  const width = Number(svgElement.getAttribute("width")) || 200;
  const height = Number(svgElement.getAttribute("height")) || 200;
  const viewBox =
    svgElement.getAttribute("viewBox") || `0 0 ${width} ${height}`;

  const pathElements = Array.from(svgElement.querySelectorAll("path"));
  const paths: PathElement[] = pathElements.map((path, index) => ({
    id: `path-${index}`,
    d: path.getAttribute("d") || "",
    fill: path.getAttribute("fill") || "#000000",
    stroke: path.getAttribute("stroke") || "none",
    strokeWidth: Number(path.getAttribute("stroke-width")) || 0,
  }));

  return { width, height, viewBox, paths };
}

/**
 * SvgDataオブジェクトからSVGコードを生成する
 */
export function generateSvgCode(svgData: SvgData): string {
  const pathsCode = svgData.paths
    .map(
      (path) =>
        `  <path d="${path.d}" fill="${path.fill}" stroke="${path.stroke}" stroke-width="${path.strokeWidth}"/>`
    )
    .join("\n");

  return `<svg width="${svgData.width}" height="${svgData.height}" viewBox="${svgData.viewBox}" xmlns="http://www.w3.org/2000/svg">
${pathsCode}
</svg>`;
}

/**
 * デフォルトのSvgDataオブジェクトを取得する
 */
export function getDefaultSvgData(): SvgData {
  return {
    width: 200,
    height: 200,
    viewBox: "0 0 200 200",
    paths: [],
  };
}

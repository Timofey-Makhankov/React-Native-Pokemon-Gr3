/**
 * Formats a given String as Capital Case
 * @param string to be capitalized
 * @returns formatted String being capitalized
 */
export default function capitalCase(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
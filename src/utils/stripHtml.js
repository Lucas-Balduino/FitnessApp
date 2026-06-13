/**
 * Remove tags HTML de strings retornadas pela API Wger.
 * Ex: "<p>Deite no banco...</p>" → "Deite no banco..."
 */
export function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')  // Remove tags HTML
    .replace(/&nbsp;/g, ' ')  // Substitui &nbsp;
    .replace(/&amp;/g, '&')   // Substitui &amp;
    .replace(/&lt;/g, '<')    // Substitui &lt;
    .replace(/&gt;/g, '>')    // Substitui &gt;
    .replace(/\n\s*\n/g, '\n') // Remove linhas vazias consecutivas
    .trim();
}

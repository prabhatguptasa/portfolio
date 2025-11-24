import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Get repository name for GitHub Pages base path
// If GITHUB_REPOSITORY is set (in CI), use it; otherwise default to '/'
const getBasePath = () => {
  if (process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1]
    // If repo name is username.github.io, it's a user page, use '/'
    // Otherwise, it's a project page, use '/repo-name/'
    return repoName.endsWith('.github.io') ? '/' : `/${repoName}/`
  }
  return '/'
}

export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

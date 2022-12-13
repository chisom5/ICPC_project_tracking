import colors from './colors'

const breakpoints = ['576px', '768px', '991px', '1220px']
const space = [0, 4, 8, 16, 32, 64, 128, 256, 512]
const fontSizes = [12, 14, 16, 18, 20, 24, 32, 48, 64, 72]
const fontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900]
const sizes  = [16, 32, 40, 44, 48, 64, 128, 256, 512, 768, 1024]
const radii = [3, 4, 5, 8, 10, 20, 30, 60, 120, '50%']

const theme = {
  breakpoints,
  space,
  sizes,
  radii,
  fontSizes,
  fontWeights,
  fonts: {
    body: 'inter, sans-serif',
    monospace: 'Menlo, monospace',
  },
  lineHeights: {
    solid: 1,
    body: 1.75,
    heading: 1.25,
  },
  letterSpacings: {
    normal: 'normal',
    tracked: '0.1em',
    tight: '-0.05em',
    mega: '0.25em',
  },
  borders: [
    0,
    '1px solid',
    '2px solid',
    '3px solid',
    '4px solid',
    '5px solid',
    '6px solid',
  ],
  colors,
}

export const getTheme = (mode) => ({
  ...theme,
  colors: theme.colors.modes[mode],
  mode,
})

export default theme

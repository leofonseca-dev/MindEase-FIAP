import _ from 'lodash';
import { createTheme } from '@mui/material/styles';
import { useEffect, useMemo } from 'react';
import { useSelector } from '../store/Store';
import { AppState } from '../store/Store';
import components from './Components';
import typography from './Typography';
import { shadows, darkshadows } from './Shadows';
import { DarkThemeColors } from './DarkThemeColors';
import { LightThemeColors } from './LightThemeColors';
import { baseDarkTheme, baselightTheme } from './DefaultColors';
import * as locales from '@mui/material/locale';
import {
  ContrastMode,
  FontScale,
  SpacingScale,
} from 'store/preferences/PreferencesSlice';

type Prefs = {
  contrastMode: ContrastMode;
  spacingScale: SpacingScale;
  fontScale: FontScale;
};

export const BuildTheme = (config: any = {}) => {
  const { customizer, prefs } = config as {
    customizer: AppState['customizer'];
    prefs: Prefs;
    direction: string;
    theme: string;
  };

  const scale =
    prefs?.fontScale === 1 ? 0.9 : prefs?.fontScale === 2 ? 1 : 1.25;

  const scaleRem = (value: any) => {
    if (typeof value !== 'string') return value;

    const rem = value.match(/^(\d+(\.\d+)?)rem$/);
    if (rem) {
      const n = Number(rem[1]);
      return `${Number((n * scale).toFixed(4))}rem`;
    }

    // Se tiver "1.2rem" no lineHeight, também escala
    const lh = value.match(/^(\d+(\.\d+)?)rem$/);
    if (lh) {
      const n = Number(lh[1]);
      return `${Number((n * scale).toFixed(4))}rem`;
    }

    return value;
  };

  const scaledTypography = _.merge({}, typography, {
    h1: {
      fontSize: scaleRem(typography.h1?.fontSize),
      lineHeight: scaleRem(typography.h1?.lineHeight),
    },
    h2: {
      fontSize: scaleRem(typography.h2?.fontSize),
      lineHeight: scaleRem(typography.h2?.lineHeight),
    },
    h3: {
      fontSize: scaleRem(typography.h3?.fontSize),
      lineHeight: scaleRem(typography.h3?.lineHeight),
    },
    h4: {
      fontSize: scaleRem(typography.h4?.fontSize),
      lineHeight: scaleRem(typography.h4?.lineHeight),
    },
    h5: {
      fontSize: scaleRem(typography.h5?.fontSize),
      lineHeight: scaleRem(typography.h5?.lineHeight),
    },
    h6: {
      fontSize: scaleRem(typography.h6?.fontSize),
      lineHeight: scaleRem(typography.h6?.lineHeight),
    },
    body1: {
      fontSize: scaleRem(typography.body1?.fontSize),
      lineHeight: scaleRem(typography.body1?.lineHeight),
    },
    body2: {
      fontSize: scaleRem(typography.body2?.fontSize),
      lineHeight: scaleRem(typography.body2?.lineHeight),
    },
    subtitle1: { fontSize: scaleRem(typography.subtitle1?.fontSize) },
    subtitle2: { fontSize: scaleRem(typography.subtitle2?.fontSize) },
  });

  const themeOptions = LightThemeColors.find((t) => t.name === config.theme);
  const darkthemeOptions = DarkThemeColors.find((t) => t.name === config.theme);

  const defaultTheme =
    customizer.activeMode === 'dark' ? baseDarkTheme : baselightTheme;
  const defaultShadow =
    customizer.activeMode === 'dark' ? darkshadows : shadows;
  const themeSelect =
    customizer.activeMode === 'dark' ? darkthemeOptions : themeOptions;

  const isDark = customizer.activeMode === 'dark';
  const highContrast = prefs?.contrastMode === 'HIGH';

  const spacingMultiplier =
    prefs?.spacingScale === 1 ? 0.85 : prefs?.spacingScale === 2 ? 1 : 1.25;

  const baseMode = {
    palette: {
      mode: customizer.activeMode,

      ...(highContrast
        ? {
            background: {
              default: isDark ? '#0b0f14' : '#ffffff',
              paper: isDark ? '#101826' : '#ffffff',
            },
            text: {
              primary: isDark ? '#ffffff' : '#111827',
              secondary: isDark ? '#E5E7EB' : '#374151',
            },
            divider: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
          }
        : {}),
    },

    spacing: (factor: number) => `${8 * factor * spacingMultiplier}px`,

    shape: {
      borderRadius:
        prefs?.spacingScale === 3
          ? Math.max(customizer.borderRadius, 14)
          : customizer.borderRadius,
    },

    shadows: defaultShadow,
    typography: scaledTypography,
  };

  const theme = createTheme(
    _.merge({}, baseMode, defaultTheme, locales, themeSelect, {
      direction: config.direction,
    }),
  );

  theme.components = _.merge({}, components(theme), {
    MuiPaper: {
      styleOverrides: {
        root: {
          ...(highContrast && {
            border: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)',
          }),
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: theme.shape.borderRadius,
          padding:
            prefs?.spacingScale === 1
              ? '6px 10px'
              : prefs?.spacingScale === 2
                ? '8px 12px'
                : '10px 14px',
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          ...(prefs?.spacingScale === 3 && { minHeight: 44 }),
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          padding:
            prefs?.spacingScale === 1
              ? '10px'
              : prefs?.spacingScale === 2
                ? '14px'
                : '18px',
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        row: {
          ...(prefs?.spacingScale === 3 && { minHeight: 72 }),
        },
      },
    },
  });

  return theme;
};

const ThemeSettings = () => {
  const activDir = useSelector((state: AppState) => state.customizer.activeDir);
  const activeTheme = useSelector(
    (state: AppState) => state.customizer.activeTheme,
  );
  const customizer = useSelector((state: AppState) => state.customizer);

  const prefs = useSelector((state: AppState) => state.preferences);

  useEffect(() => {
    document.dir = activDir;
  }, [activDir]);

  const theme = useMemo(
    () =>
      BuildTheme({
        direction: activDir,
        theme: activeTheme,
        customizer,
        prefs: {
          contrastMode: prefs.contrastMode,
          spacingScale: prefs.spacingScale,
          fontScale: prefs.fontScale,
        },
      }),
    [
      activDir,
      activeTheme,
      customizer,
      prefs.contrastMode,
      prefs.spacingScale,
      prefs.fontScale,
    ],
  );

  return theme;
};

export { ThemeSettings };

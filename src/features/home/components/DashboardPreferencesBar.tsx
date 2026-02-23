import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  Typography,
  Tooltip,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import WidgetMenu from 'layouts/full/vertical/header/WidgetMenu';
import { useDispatch, useSelector } from 'store/Store';
import {
  setComplexityLevel,
  toggleFocusMode,
  toggleHideSensitiveValues,
  toggleReduceMotion,
  toggleSummaryMode,
  ComplexityLevel,
  setSpacingScale,
  SpacingScale,
  ContrastMode,
  setContrastMode,
  setFontScale,
  FontScale,
} from 'store/preferences/PreferencesSlice';

export function DashboardPreferencesBar() {
  const dispatch = useDispatch();
  const prefs = useSelector((s) => s.preferences);

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
      role="region"
      aria-label="Preferências cognitivas"
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Stack spacing={0.5}>
            <Typography variant="h6">Painel Cognitivo</Typography>
            <Typography variant="body2" color="text.secondary">
              Ajuste a complexidade, foco e estímulos visuais.
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6} justifyContent="flex-end">
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
          >
            <FormControl size="small">
              <InputLabel id="complexity-label">Complexidade</InputLabel>
              <Select
                labelId="complexity-label"
                label="Complexidade"
                value={prefs.complexityLevel}
                onChange={(e: any) =>
                  dispatch(
                    setComplexityLevel(
                      Number(e.target.value) as ComplexityLevel,
                    ),
                  )
                }
              >
                <MenuItem value={1}>Nível 1 — Simples</MenuItem>
                <MenuItem value={2}>Nível 2 — Padrão</MenuItem>
                <MenuItem value={3}>Nível 3 — Detalhado</MenuItem>
              </Select>
            </FormControl>

            <Tooltip title="Esconde distrações e deixa a tela mais limpa">
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  px: 1.25,
                  py: 0.75,
                  borderRadius: 1.5,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="body2">Modo foco</Typography>
                <Switch
                  checked={prefs.focusMode}
                  onChange={() => dispatch(toggleFocusMode())}
                  inputProps={{ 'aria-label': 'Ativar modo foco' }}
                />
              </Stack>
            </Tooltip>

            <WidgetMenu />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Accordion
            disableGutters
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Stack>
                <Typography variant="subtitle2">
                  Ajustes visuais e privacidade
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Contraste, espaçamento, resumo, animações e valores.
                </Typography>
              </Stack>
            </AccordionSummary>

            <AccordionDetails>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="contrast-label">Contraste</InputLabel>
                    <Select
                      labelId="contrast-label"
                      label="Contraste"
                      value={prefs.contrastMode}
                      onChange={(e: any) =>
                        dispatch(
                          setContrastMode(e.target.value as ContrastMode),
                        )
                      }
                    >
                      <MenuItem value="NORMAL">Normal</MenuItem>
                      <MenuItem value="HIGH">Alto contraste</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="spacing-label">Espaçamento</InputLabel>
                    <Select
                      labelId="spacing-label"
                      label="Espaçamento"
                      value={prefs.spacingScale}
                      onChange={(e: any) =>
                        dispatch(
                          setSpacingScale(
                            Number(e.target.value) as SpacingScale,
                          ),
                        )
                      }
                    >
                      <MenuItem value={1}>Compacto</MenuItem>
                      <MenuItem value={2}>Padrão</MenuItem>
                      <MenuItem value={3}>Confortável</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="font-label">Fonte</InputLabel>
                    <Select
                      labelId="font-label"
                      label="Fonte"
                      value={prefs.fontScale}
                      onChange={(e: any) =>
                        dispatch(
                          setFontScale(Number(e.target.value) as FontScale),
                        )
                      }
                    >
                      <MenuItem value={1}>Menor</MenuItem>
                      <MenuItem value={2}>Padrão</MenuItem>
                      <MenuItem value={3}>Maior</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>

                <Grid item sm={4}>
                  <Tooltip title="Resumo mostra só o essencial">
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{
                        px: 1.25,
                        py: 0.75,
                        borderRadius: 1.5,
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <Typography variant="body2">Resumo</Typography>
                      <Switch
                        checked={prefs.summaryMode}
                        onChange={() => dispatch(toggleSummaryMode())}
                        inputProps={{ 'aria-label': 'Alternar modo resumo' }}
                      />
                    </Stack>
                  </Tooltip>
                </Grid>

                <Grid item sm={4}>
                  <Tooltip title="Reduz animações e movimento na interface">
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{
                        px: 1.25,
                        py: 0.75,
                        borderRadius: 1.5,
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <Typography variant="body2">Reduzir animações</Typography>
                      <Switch
                        checked={prefs.reduceMotion}
                        onChange={() => dispatch(toggleReduceMotion())}
                        inputProps={{
                          'aria-label': 'Alternar reduzir animações',
                        }}
                      />
                    </Stack>
                  </Tooltip>
                </Grid>

                <Grid item sm={4}>
                  <Tooltip title="Oculta valores monetários (útil para ansiedade/privacidade)">
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{
                        px: 1.25,
                        py: 0.75,
                        borderRadius: 1.5,
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <Typography variant="body2">Ocultar valores</Typography>
                      <Switch
                        checked={prefs.hideSensitiveValues}
                        onChange={() => dispatch(toggleHideSensitiveValues())}
                        inputProps={{
                          'aria-label': 'Alternar ocultar valores',
                        }}
                      />
                    </Stack>
                  </Tooltip>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Box>
  );
}

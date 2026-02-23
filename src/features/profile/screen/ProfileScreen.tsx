import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from '@mui/material';
import { useDispatch, useSelector } from 'store/Store';
import { AppState } from 'store/Store';
import { DashboardPreferencesBar } from 'features/home/components/DashboardPreferencesBar';
import { setNeed, setRoutine } from 'store/preferences/PreferencesSlice';
import { updateProfile } from 'store/user/UserSlice';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const prefs = useSelector((s: AppState) => s.preferences);
  const profile = useSelector((s: AppState) => s.user.profile);

  return (
    <Box sx={{ px: 5, py: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src="/images/profile/user-1.jpg"
                  sx={{ width: 72, height: 72 }}
                />
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    {profile.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profile.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profile.email}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={2}>
                <TextField
                  label="Nome"
                  size="small"
                  value={profile.name}
                  onChange={(e: any) =>
                    dispatch(updateProfile({ name: e.target.value }))
                  }
                />
                <TextField
                  label="E-mail"
                  size="small"
                  value={profile.email}
                  onChange={(e: any) =>
                    dispatch(updateProfile({ email: e.target.value }))
                  }
                />
                <TextField
                  label="Área / Cargo"
                  size="small"
                  value={profile.role}
                  onChange={(e: any) =>
                    dispatch(updateProfile({ role: e.target.value }))
                  }
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <DashboardPreferencesBar />

          <Box mt={2} />

          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" fontWeight={700}>
                Necessidades específicas
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Isso ajuda a adaptar alertas, ritmo e interface.
              </Typography>

              <Grid container>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={prefs.needs.adhd}
                        onChange={(e: any) =>
                          dispatch(
                            setNeed({ key: 'adhd', value: e.target.checked }),
                          )
                        }
                      />
                    }
                    label="TDAH"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={prefs.needs.dyslexia}
                        onChange={(e: any) =>
                          dispatch(
                            setNeed({
                              key: 'dyslexia',
                              value: e.target.checked,
                            }),
                          )
                        }
                      />
                    }
                    label="Dislexia"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={prefs.needs?.anxiety ?? false}
                        onChange={(e: any) =>
                          dispatch(
                            setNeed({
                              key: 'anxiety',
                              value: e.target.checked,
                            }),
                          )
                        }
                      />
                    }
                    label="Ansiedade"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={prefs.needs?.autism ?? false}
                        onChange={(e: any) =>
                          dispatch(
                            setNeed({
                              key: 'autism',
                              value: e.target.checked,
                            }),
                          )
                        }
                      />
                    }
                    label="TEA (Autismo)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={prefs.needs?.sensoryOverload ?? false}
                        onChange={(e: any) =>
                          dispatch(
                            setNeed({
                              key: 'sensoryOverload',
                              value: e.target.checked,
                            }),
                          )
                        }
                      />
                    }
                    label="Sobrecarga sensorial"
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" fontWeight={700}>
                Rotina
              </Typography>

              <Typography variant="body2" color="text.secondary" mb={1}>
                Para manter previsibilidade e transições suaves.
              </Typography>

              <Typography variant="body2" fontWeight={600}>
                Melhor período do dia
              </Typography>
              <RadioGroup
                row
                value={prefs.routine?.bestTimeOfDay ?? 'MORNING'}
                onChange={(e: any) =>
                  dispatch(
                    setRoutine({ key: 'bestTimeOfDay', value: e.target.value }),
                  )
                }
              >
                <FormControlLabel
                  value="MORNING"
                  control={<Radio />}
                  label="Manhã"
                />
                <FormControlLabel
                  value="AFTERNOON"
                  control={<Radio />}
                  label="Tarde"
                />
                <FormControlLabel
                  value="NIGHT"
                  control={<Radio />}
                  label="Noite"
                />
              </RadioGroup>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={prefs.routine?.breakReminder ?? true}
                    onChange={(e: any) =>
                      dispatch(
                        setRoutine({
                          key: 'breakReminder',
                          value: e.target.checked,
                        }),
                      )
                    }
                  />
                }
                label="Lembrar pausas curtas automaticamente"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

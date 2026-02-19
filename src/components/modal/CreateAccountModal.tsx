import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@mui/material';
import CustomFormLabel from 'components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'components/forms/theme-elements/CustomTextField';
import Image from 'next/image';
import AuthLogin from 'pages/auth/authForms/AuthLogin';
import AuthRegister from 'pages/auth/authForms/AuthRegister';

interface CreateAccountModalProps {
  open: boolean;
  handleClose: () => void;
}

const CreateAccountModal = ({
  open,
  handleClose,
}: CreateAccountModalProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Box display="flex" alignItems="center" justifyContent="center" px={10}>
          <Image
            src="/images/banner_4.png"
            alt="logo"
            height={300}
            width={350}
            priority
          />
        </Box>
        <Typography variant='h6' textAlign={'center'}>
          Preencha os campos abaixo para criar sua conta corrente!
        </Typography>

        <AuthRegister />
      </DialogContent>

    </Dialog>
  );
};

export default CreateAccountModal;

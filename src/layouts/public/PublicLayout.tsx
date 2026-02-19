import { Box } from "@mui/material";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface BlankLayoutProps {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: BlankLayoutProps) => {
  return (
    <Box>
      <Header />
      <Box>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default PublicLayout;




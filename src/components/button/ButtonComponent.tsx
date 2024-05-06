import { Button, SxProps, Theme } from '@mui/material';

type ButtonProps = {
  innerText: string;
  style: SxProps<Theme>;
  onClick: () => void;
};

const ButtonComponent = ({ innerText, style, onClick }: ButtonProps) => {
  return (
    <Button
      sx={style}
      onClick={onClick}
    >
      {innerText}
    </Button>
  );
};

export default ButtonComponent;

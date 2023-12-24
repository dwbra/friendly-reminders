import Tooltip from '@mui/material/Tooltip';

export default function Tooltip(ToolTipButton, ToolTipIcon, title) {
  return (
    <Tooltip title={title}>
      <ToolTipButton>
        <ToolTipIcon />
      </ToolTipButton>
    </Tooltip>
  );
}

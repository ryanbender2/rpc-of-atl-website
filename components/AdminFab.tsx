import { Box, Fab, Grid } from "@mui/material";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function AdminFab() {
    return (
        <Fab color="secondary" aria-label="edit" href="/admin">
            <AdminPanelSettingsIcon />
        </Fab>
    )
}

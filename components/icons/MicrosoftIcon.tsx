import { SvgIcon } from '@mui/material'


export default function MicrosoftIcon(props: any) {
    return (
        <SvgIcon viewBox='0 0 48 48' {...props} style={{ fill: '#000000' }}>
            <path fill="#ff5722" d="M6 6H22V22H6z" transform="rotate(-180 14 14)" />
            <path fill="#4caf50" d="M26 6H42V22H26z" transform="rotate(-180 34 14)" />
            <path fill="#ffc107" d="M26 26H42V42H26z" transform="rotate(-180 34 34)" />
            <path fill="#03a9f4" d="M6 26H22V42H6z" transform="rotate(-180 14 34)" />
        </SvgIcon>
    )
}

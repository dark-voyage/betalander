import { info } from "./utils.ts";

const helper_text: string =
`Usage: betalander <command>

Some useful commands are:

build       Build a new server
update      Update server executable
launch      Launch current server
help        Show this message

Type 'betalander help' to get this help message.`

export const helper = () => {
    info(helper_text)
}


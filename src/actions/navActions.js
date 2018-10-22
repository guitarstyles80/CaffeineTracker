import axios from 'axios';

export function changeNavStatus(route) {
    return {
        route,
        type: "CHANGE_NAV_STATUS",
    };
}

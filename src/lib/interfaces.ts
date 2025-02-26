interface Event {
    name: string;
    key: string;
    amount: number;
    team: boolean;
}

interface CheckedItem extends Event {
    checked: boolean;
}

interface CheckboxProps {
    className: string;
    value: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface EventList {
    team: boolean;
    name: string;
    description: string;
    rules: string[];
    prerequisites: string[];
    general_rules: string[];
    thumbnail: string;
    startTime: string;
    endTime: string;
    costs: number;
    facultyCoordinator: { name: string; phone: string }[];
    studentCoordinator: { name: string; phone: string }[];
}

interface Events {
    [key: string]: EventList;
}

interface Teams {
    name: string;
    event: string;
}

export type { Event, CheckedItem, CheckboxProps, Events, Teams };

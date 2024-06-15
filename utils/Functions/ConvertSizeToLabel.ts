import { Enums } from "../../src/Store/Models/Database";

export const ConvertSizeToLabel = (size: Enums<'size_type'>) => {
    switch (size) {
        case 'Big':
            return '1kg'
        case 'Small':
            return '500g'
    }
}
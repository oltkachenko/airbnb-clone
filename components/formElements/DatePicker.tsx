'use client';

import { DateRange, type Range, type RangeKeyDict } from "react-date-range";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'

interface DatePickerProps {
    value: Range,
    onChange: (value: RangeKeyDict) => void;
    disabledDates?: Date[];
}

export default function DatePicker({
    value,
    onChange,
    disabledDates
}: DatePickerProps) {
    return (
        <DateRange
            rangeColors={['#262626']}
            ranges={[value]}
            date={new Date()}
            onChange={onChange}
            direction="vertical"
            showDateDisplay={false}
            minDate={new Date()}
            disabledDates={disabledDates}
        />
    )
}

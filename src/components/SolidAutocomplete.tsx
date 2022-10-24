import Autocomplete, {
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
    AutocompleteInputChangeReason,
    AutocompleteProps,
    AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";

const SolidAutocomplete = ({
    value,
    setValue,
    inputValue,
    setInputValue,
    options,
    renderInput,
    ...autocompleteProps
}: {
    value: string | null;
    setValue: (arg0: string | null) => void;
    inputValue: string;
    setInputValue: (arg0: string) => void;
    options: string[] | { label: string }[];
    renderInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
} & AutocompleteProps<string, undefined, undefined, undefined>) => {
    const handleChange = (
        event: React.SyntheticEvent<Element, Event>,
        value: string | null,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<string> | undefined,
    ) => {
        setValue(value);
    };

    const handleInputChange = (
        event: React.SyntheticEvent<Element, Event>,
        value: string,
        reason: AutocompleteInputChangeReason,
    ) => {
        setInputValue(value);
    };

    // const { renderInput, ...autocompletePropsRest } = autocompleteProps;
    // const { sx: inputSx, ...inputPropsRest } = inputProps || {};

    return (
        <Autocomplete
            value={value}
            onChange={handleChange}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            options={options}
            renderInput={renderInput}
            {...autocompleteProps}
        />
    );
};

export default SolidAutocomplete;

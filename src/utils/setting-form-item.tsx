import * as Select from "@radix-ui/react-select";
import { ERulesItemHtmlType, IRulesOptionItem } from "@/constants/defaultSchema";
import { CheckSmall, Down, Up } from "@icon-park/react";


const getSettingFormItemComponent = (
  type: ERulesItemHtmlType,
  required: boolean,
  options: IRulesOptionItem[],
  field: { name: string }
) => {

  switch (type) {
    case ERulesItemHtmlType.Input:
      return (
        <input
          {...field}
          className="border border-solid border-gary-400 w-full"
          type="text"
          autoComplete='off'
        />
      );
    case ERulesItemHtmlType.Select:
      return (
        <Select.Root>
          <Select.Trigger className="SelectTrigger" aria-label="Food">
            <Select.Value placeholder="Select a fruit…" />
            <Select.Icon className="SelectIcon">
              <Down theme="outline" size="24" fill="#333" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="SelectContent">
              <Select.ScrollUpButton className="SelectScrollButton">
                <Up theme="outline" size="24" fill="#333" />
              </Select.ScrollUpButton>
              <Select.Viewport className="SelectViewport">
                <Select.Group>
                  {
                    options.map(option => (
                      <Select.Item
                        className={"SelectItem"}
                        value={option.value}
                        key={option.value}
                      // ref={forwardedRef}
                      >
                        <Select.ItemText>{option.label}</Select.ItemText>
                        <Select.ItemIndicator className="SelectItemIndicator">
                          <CheckSmall theme="outline" size="24" fill="#333" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))
                  }
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton className="SelectScrollButton">
                <Down theme="outline" size="24" fill="#333" />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      )
    case ERulesItemHtmlType.Textarea:
    default:
      return null;
  }
}

export default getSettingFormItemComponent;
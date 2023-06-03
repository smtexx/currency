interface I_Field {
  label: string;
  value: string;
  checked: boolean;
}

export interface I_SettingsSection {
  legend: string;
  fields: I_Field[];
  handler: (
    fieldValue: I_Field['value'],
    fields: I_Field[]
  ) => I_Field[];
}

type T_Settings = I_SettingsSection[];

export const config: T_Settings = [
  // {
  //   legend: 'Язык интерфейса',
  //   fields: [
  //     { label: 'Русский', value: 'russian', checked: true },
  //     { label: 'English', value: 'english', checked: false },
  //   ],
  //   handler(fieldValue, fields) {
  //     fields.forEach((field) => {
  //       field.checked = field.value === fieldValue;
  //     });

  //     return fields;
  //   },
  // },
  {
    legend: 'Конвертация',
    fields: [
      {
        label: 'Дополнительный блок',
        value: 'additionalBlock',
        checked: false,
      },
    ],
    handler(fieldValue, fields) {
      fields.forEach((field) => {
        if (field.value === fieldValue) {
          field.checked = !field.checked;
        }
      });

      return fields;
    },
  },
  {
    legend: 'Сохранение',
    fields: [
      { label: 'Курсы валют', value: 'saveRates', checked: false },
      {
        label: 'Добавленные курсы',
        value: 'saveUserRates',
        checked: true,
      },
      {
        label: 'Введенные значения',
        value: 'saveExchangeData',
        checked: true,
      },
      {
        label: 'Настройки приложения',
        value: 'saveAppSettings',
        checked: true,
      },
      {
        label: 'Удалить все данные',
        value: 'clearAllData',
        checked: false,
      },
    ],
    handler(fieldValue, fields) {
      const clearFieldValue = 'clearAllData';
      const clearFieldChecked =
        fields.find(({ value }) => value === clearFieldValue)
          ?.checked || false;

      if (fieldValue === clearFieldValue && !clearFieldChecked) {
        // Switch off other fields if switch on clearAllData
        fields.forEach((field) => {
          if (field.value === clearFieldValue) {
            field.checked = true;
          } else {
            field.checked = false;
          }
        });
      } else {
        fields.forEach((field) => {
          if (field.value === clearFieldValue) {
            field.checked = false;
          }
          if (field.value === fieldValue) {
            field.checked = !field.checked;
          }
        });
      }

      return fields;
    },
  },
];

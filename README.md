# update_dotnetappver_action

Действие позволяет заменить значение версии в файле AssemblyInfo.cs

## Применение

Автоматизация сборки .Net приложения

## Параметры

### Вход

| Параметр    | Описание                                      | Тип    | Обязательный | Значение по умолчанию |
| ----------- | --------------------------------------------- | ------ | ------------ | --------------------- |
| filename    | Путь к файлу AssemblyInfo.cs                  | Строка | Да           | AssemblyInfo.cs       |
| keyword     | Ключевое слово версии в файле AssemblyInfo.cs | Строка | Да           | AssemblyFileVersion   |
| new_version | Значение версии на которую нужно заменить     | Строка | Да           | 1.0.0                 |

## Примеры использования

```
- name: Replace app version
  uses: aps-m/update_dotnetappver_action@v1
  with:
    filename: 'path/to/AssemblyInfo.cs'
    keyword: 'AssemblyFileVersion'
    new_version: '1.0.35'
```

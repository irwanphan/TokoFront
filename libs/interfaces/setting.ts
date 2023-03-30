export interface SettingInterface {
    id: String
    name: String
    description: String
    value: String
    createdAt: String
    createdBy: String
}

export interface AdminSettingInterface {
    settingBusinessName: string
    settingBusinessDescription: string
    settingSalesOrderingModeEnable: string
    settingMainPageMode: string
}
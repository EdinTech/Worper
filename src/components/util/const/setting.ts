export const PATCHING = {
    // workspace directory path key
    WORKSPACE_PATH_KEY: 'setting.patching.defaultPath',

    // default output path key
    DEFAULT_OUTPUT_DIRECTORY_PATH_KEY: 'setting.patching.default.outputPath',
    // custom output path key
    OUTPUT_DIRECTORY_PATH_KEY: 'setting.patching.outputPath',
    // output directory name
    OUTPUT_DIRECTORY_NAME: 'output',

    // setting directory path key
    SETTING_DIRECTORY_PATH_KEY: 'setting.patching.default.settingPath',
    // setting file path key
    SETTING_FILE_PATH_KEY: 'setting.patching.default.settingFile',
    // setting directory name
    SETTING_DIRECTORY_NAME: 'setting',
    // setting file name
    SETTING_FILE_NAME: 'setting.json',
    // setting file content
    INITIAL_SETTING_FILE_CONTENT: {
        default_applicant: "",
        default_checker: "小林",
        members: ["神野", "杉浦", "小林", "カン", "パク", "情シス開発保守運用2"],
        action: ["データ変更", "追加", "リカバリー", "論理削除"],
        table_name: {
            "entry": "申込データ",
            "payment": "精算データ",
            "sales": "売上データ"
        }
    },

    // custom templates directory path key
    TEMPLATE_DIRECTORY_PATH_KEY: 'setting.patching.templatePath',
    // templates directory name
    TEMPLATE_DIRECTORY_NAME: 'templates',
    // template index file key
    TEMPLATE_INDEX_FILE_PATH_KEY: 'setting.patching.templateIndex',
    // template index file name
    TEMPLATE_INDEX_FILE_NAME: 'template_index.json',
    // template index file content
    INITIAL_TEMPLATE_INDEX_FILE_CONTENT: {
        template_title_index: {
            "テンプレート1": "ex1.json",
        },
    },
    // template list file key
    TEMPLATE_LIST_FILE_PATH_KEY: 'setting.patching.templateList.path',
    // template list file name
    TEMPLATE_LIST_FILE_NAME: 'template_list.json',
    // template list file content
    INITIAL_TEMPLATE_LIST_FILE_CONTENT: [
        {
            key: '1',
            template: 'テンプレート1',
            description: 'New York No. 1 Lake Park',
            file: 'ex1.json',
            createdAt: "2023-10-25T22:05:09+09:00"
        },
    ],
    // example template file name
    EXAMPLE_TEMPLATE_FILE_NAME: 'ex1.json',
    // example template file content
    INITIAL_EXAMPLE_TEMPLATE_FILE_CONTENT: {
        "applier": "applier",
        "checker": "checker",
        "tableName": "tableName",
        "action": "action",
        "sql": "update entry set update_date_time = current_timestamp where entry_id = 0",
        "description": "This is a sample sql.",
        "extension": "sql"
    },
}
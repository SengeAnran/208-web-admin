import index from "../views/Home/index.vue";

export const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            index: 0
        },
        component: index,
        children: []
    },
    { // 装备技术
        name: "EquipmentTechnology",
        path: "/EquipmentTechnology",
        meta: {
            index: 5,
        },
        component: () => import("../views/Home/EquipmentTechnology"),
        // template: '<router-view/>',
    },
    { // 装备技术详情
        name: "EquipmentTechnologyDetail",
        path: "/EquipmentTechnology/detail",
        meta: {
            index: 5,
        },
        component: () => import("../views/Home/Detail"),
        // template: '<router-view/>',
    },
    { // 装备技术 专利列表
        name: "EquipmentTechnologyList",
        path: "/EquipmentTechnology/list",
        meta: {
            index: 5,
        },
        component: () => import("../views/Home/List"),
        // template: '<router-view/>',
    },
    { // 装备技术 专利列表
        name: "KeyUnits",
        path: "/KeyUnits",
        meta: {
            index: 0,
        },
        component: () => import("../views/Home/KeyUnits"),
        // template: '<router-view/>',
    },
    { // 重点单位 /行业监控
        name: "EquipmentTechnologyList",
        path: "/EquipmentTechnology/list",
        meta: {
            index: 5,
        },
        component: () => import("../views/Home/List"),
        // template: '<router-view/>',
    },
    { // 专利检索
        name: "PatentSearch",
        path: "/PatentSearch",
        meta: {
            index: 1,
        },
        component: () => import("../views/PatentSearch"),
        // template: '<router-view/>',
    },
    { // 专利检索详情
        name: "PatentSearchDetail",
        path: "/PatentSearch/detail",
        meta: {
            index: 1,
        },
        component: () => import("../views/PatentSearch/detail/index.vue"),
        // template: '<router-view/>',
    },

    { // 专报管理
        name: "SpecialReport",
        path: "/PatentManagement/SpecialReport",
        meta: {
            index: 2,
        },
        component: () => import("../views/PatentManagement/SpecialReport/index.vue"),
        // template: '<router-view/>',
    },
    { // 专报管理 详情
        name: "SpecialReportDetail",
        path: "/PatentManagement/SpecialReport/detail",
        meta: {
            index: 2,
        },
        component: () => import("../views/PatentManagement/SpecialReport/detail/index.vue"),
        // template: '<router-view/>',
    },
    { // 专报管理 修改
        name: "SpecialReportEdit",
        path: "/PatentManagement/SpecialReport/edit",
        meta: {
            index: 2,
        },
        component: () => import("../views/PatentManagement/SpecialReport/edit/index.vue"),
        // template: '<router-view/>',
    },
    // 深度解析
    { // 深度解析
        name: "DeepAnalysis",
        path: "/PatentManagement/DeepAnalysis",
        meta: {
            index: 2,
        },
        component: () => import("../views/PatentManagement/DeepAnalysis/index.vue"),
        // template: '<router-view/>',
    },
    { // 深度解析 详情
        name: "DeepAnalysisDetail",
        path: "/PatentManagement/DeepAnalysis/detail",
        meta: {
            index: 2,
        },
        component: () => import("../views/PatentManagement/DeepAnalysis/detail/index.vue"),
        // template: '<router-view/>',
    },
    { // 深度解析 修改
        name: "DeepAnalysisEdit",
        path: "/PatentManagement/DeepAnalysis/edit",
        meta: {
            index: 2,
        },
        component: () => import("../views/PatentManagement/DeepAnalysis/edit/index.vue"),
        // template: '<router-view/>',
    },
    { // 专利解析
        name: "PatentAnalysis",
        path: "/PatentManagement/PatentAnalysis",
        meta: {
            index: 2,
        },
        component: () => import("../views/PatentManagement/PatentAnalysis/index.vue"),
        // template: '<router-view/>',
    },
    { // 专利解析详情
        name: "PatentAnalysisDetail",
        path: "/PatentManagement/PatentAnalysis/detail",
        meta: {
            index: 2,
        },
        component: () => import("../views/PatentManagement/PatentAnalysis/detail/index.vue"),
        // template: '<router-view/>',
    },
    { // 专利解析修改
        name: "PatentAnalysisEdit",
        path: "/PatentManagement/PatentAnalysis/edit",
        meta: {
            index: 2,
        },
        component: () => import("../views/PatentManagement/PatentAnalysis/edit/index.vue"),
        // template: '<router-view/>',
    },

    { // 提示词管理
        name: "CueWord",
        path: "/PatentManagement/CueWord",
        meta: {
            index: 2,
        },
        component: () => import("../views/PatentManagement/CueWord/index.vue"),
        // template: '<router-view/>',
    },

    { // 文件管理
        path: "/DataManagement/FileManage",
        name: "FileManage",
        meta: {
            index: 3,
        },
        component: () => import("../views/DataManagement/FileManage"),
    },
    { // 文件管理详情
        path: "/DataManagement/FileManage/detail",
        name: "FileManageDetail",
        meta: {
            index: 3,
        },
        component: () => import("../views/DataManagement/FileManage/detail"),
    },
    { // 数据源管理
        path: "/DataManagement/DataSourceManage",
        name: "DataSourceManage",
        meta: {
            index: 3,
        },
        component: () => import("../views/DataManagement/DataSourceManage"),
    },
    // {
    //     path: "/AssessmentManagement",
    //     name: "AssessmentManagement",
    //     meta: {
    //         index: 0,
    //     },
    //     component: () => import("../views/AssessmentManagement"),
    // },
    // 通用能力 科研创新助理
    {
        path: "/ResearchInnovation",
        name: "ResearchInnovation",
        meta: {
            index: 4,
        },
        component: () => import("../views/ResearchInnovation/Assistant/index.vue"),
    },
    // {
    //     path: "/intelligentMatrix/detail",
    //     name: "intelligentMatrixDetail",
    //     meta: {
    //         index: 0,
    //     },
    //     component: () => import("../views/IntelligentMatrix/Detail/index.vue"),
    // },
    // { //数智大模型
    //     name: "intelligenceModel",
    //     path: "/intelligenceModel",
    //     meta: {
    //         index: 1,
    //     },
    //     component: () => import("../views/IntelligenceModel"),
    // },
    // { // 领域智慧场景
    //     name: "smartScene",
    //     path: "/smartScene",
    //     meta: {
    //         index: 2,
    //     },
    //     component: () => import("../views/SmartScene"),
    // },
    // {
    //     path: "/smartScene/detail",
    //     name: "smartSceneDetail",
    //     meta: {
    //         index: 2,
    //     },
    //     component: () => import("../views/SmartScene/Detail"),
    // },
    // { // AI人才培养
    //     name: "personnelTraining",
    //     path: "/personnelTraining",
    //     meta: {
    //         index: 3,
    //     },
    //     component: () => import("../views/PersonnelTraining"),
    // },
    // {
    //     path: "/personnelTraining/detail",
    //     name: "personnelTrainingDetail",
    //     meta: {
    //         index: 3
    //     },
    //     component: () => import("../views/PersonnelTraining/Detail"),
    // },
    // { // 数智化转型
    //     name: "digitalTransformation",
    //     path: "/digitalTransformation",
    //     meta: {
    //         index: 4,
    //     },
    //     component: () => import("../views/DigitalTransformation"),
    // },
    // { // 关于我们
    //     name: "aboutUs",
    //     path: "/aboutUs",
    //     meta: {
    //         index: 5,
    //     },
    //     component: () => import("../views/AboutUs"),
    // },
    { //
        name: "noAuth",
        path: "/noAuth",
        component: () => import("../views/NoAuth"),
    },
    {
        name: "bindAccount",
        path: "/bindAccount",
        component: () => import("../views/BindAccount"),
    },
]

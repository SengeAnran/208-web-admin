export default {
    activeNavIndex: (state) => state.activeNavIndex,
    searchData: (state) => state.patentSearch.searchData,
    useSearchData: (state) => state.patentSearch.useSearchData,
    homeSearchData: (state) => state.home.searchData,
    homeUseSearchData: (state) => state.home.useSearchData,
    questionRes: (state) => state.home.questionRes,
    questionResList: (state) => state.home.questionResList,
    // token: (state) => state.user.token,
}

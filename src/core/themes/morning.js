import colors from 'vuetify/lib/util/colors'

const colorset = {
    c1: "#505c68",
    c2: "#9bafc7",
    c3: "#ffffff",
    c4: "#ffe5de",
    c5: "#dabeba"
}

export default {
    background: colorset.c2,
    secondary: colors.indigo,
    tertiary: colors.pink.base,
    tiptaptoolbar: colorset.c3,

    // header
    header: {
        base: colorset.c1,
        lighten5: colorset.c4
    },
    header_theme_btn: colorset.c4,
    header_login_btn: colorset.c4,

    //form -> showcase -> top
    form_showcase_top_table_hover_background: "#F5F5F5",

    // v-card colors
    v_card_background: colorset.c1,
    v_card_title_color: colors.orange.lighten5,

    // v-tabs colors
    v_tabs_header_background: colorset.c1,
    v_tabs_header_color: colorset.c4,
    v_tabs_title_slider_color: colorset.c4,
    v_tabs_iactive_color: colorset.c4,
}
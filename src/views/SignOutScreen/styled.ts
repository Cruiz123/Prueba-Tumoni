import { COLORS, FONTS, SIZES } from '../../utils/theme'

export default {
    container: {
        flex: 1,
    },
    containerKeyboard: {
        flex: 1,
        backgroundColor: COLORS.BackgroundColorLight,
        paddingHorizontal: SIZES.h3,
    },
    containerText: {
        padding: SIZES.padding,
        alignItems: 'center',
    },
    legendTitles: {
        ...FONTS.h1,
        color: COLORS.primaryColor,
        marginVertical: SIZES.h1,
        fontWeight: 'bold',
    },
    legendSubTitle: {
        ...FONTS.h3,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        maxWidth: '90%',
    },
    containerSingUp: {
        // flexDirection: 'row',
        // justifyContent: 'center',
        // paddingVertical: 15,
        paddingTop: 60,
    },
}

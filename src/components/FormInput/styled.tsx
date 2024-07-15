import { COLORS, FONTS } from '../../utils/theme'

export default {
    containerText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerPrepend: {
        flexDirection: 'row',
        height: 55,
        paddingHorizontal: 10,
        marginTop: 8,
        borderRadius: 10,
        backgroundColor: '#DDDDDD',
    },
    legendLabel: {
        color: '#898B9A',
        fontSize: 14,
    },
    legendLabelError: {
        ...FONTS.h4,
        color: COLORS.red,
    },
    containerError: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // marginTop: getRescaling(2.5),
    },
}

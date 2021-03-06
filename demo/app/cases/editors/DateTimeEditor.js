import CanvasView from 'demoPage/views/CanvasView';

const someDate = moment('1986-09-04T17:30:00.000Z');
const formatLocalisePrefix = 'CORE.FORMATS.MOMENT';

export default function() {
    const model = new Backbone.Model({
        dateTimeValue: '2019-04-01T10:46:37Z'
    });

    const view = new Core.form.editors.DateTimeEditor({
        model,
        autocommit: true,
        key: 'dateTimeValue',
        calendar: {
            dates: [
                {
                    date: '2019-04-05T10:46:37.000Z',
                    type: 'weekend'
                },
                {
                    date: '2019-04-06T10:46:37.000Z',
                    type: 'weekend'
                },
                {
                    date: '2019-04-13T10:46:37.000Z',
                    type: 'holiday'
                },
                {
                    date: '2019-04-16T10:46:37.000Z',
                    type: 'shortday',
                    hours: 6
                }
            ],
            additional: [['2019-04-03T00:00:00.000Z', '2019-04-03T23:00:00.000Z'], ['2019-04-05T00:00:00.000Z', '2019-04-20T00:00:00.000Z']]
        }
    });

    return new CanvasView({
        view,
        presentation: '{{dateTimeValue}}',
        isEditor: true,
        showFormat: true,
        formats: [
            {
                id: 'ShortDate',
                dateDisplayFormat: Localizer.get(`${formatLocalisePrefix}.SHORTDATE`),
                timeDisplayFormat: null,
                text: someDate.format(Localizer.get(`${formatLocalisePrefix}.SHORTDATE`))
            },
            {
                id: 'LongDate',
                timeDisplayFormat: null,
                dateDisplayFormat: Localizer.get(`${formatLocalisePrefix}.LONGDATE`),
                text: someDate.format(Localizer.get(`${formatLocalisePrefix}.LONGDATE`))
            },
            {
                id: 'ShortTime',
                dateDisplayFormat: null,
                timeDisplayFormat: Localizer.get(`${formatLocalisePrefix}.SHORTTIME`),
                text: someDate.format(Localizer.get(`${formatLocalisePrefix}.SHORTTIME`))
            },
            {
                id: 'LONG_TIME',
                dateDisplayFormat: null,
                timeDisplayFormat: Localizer.get(`${formatLocalisePrefix}.LONGTIME`),
                text: someDate.format(Localizer.get(`${formatLocalisePrefix}.LONGTIME`))
            },
            {
                id: 'LongDateShortTime',
                timeDisplayFormat: Localizer.get(`${formatLocalisePrefix}.SHORTTIME`),
                dateDisplayFormat: Localizer.get(`${formatLocalisePrefix}.LONGDATE`),
                text: `${someDate.format(Localizer.get(`${formatLocalisePrefix}.LONGDATE`))} ${someDate.format(Localizer.get(`${formatLocalisePrefix}.SHORTTIME`))}`
            },
            {
                id: 'LONG_DATE_LONG_TIME',
                timeDisplayFormat: Localizer.get(`${formatLocalisePrefix}.LONGTIME`),
                dateDisplayFormat: Localizer.get(`${formatLocalisePrefix}.LONGDATE`),
                text: `${someDate.format(Localizer.get(`${formatLocalisePrefix}.LONGDATE`))} ${someDate.format(Localizer.get(`${formatLocalisePrefix}.LONGTIME`))}`
            },
            {
                id: 'SHORT_DATE_SHORT_TIME',
                dateDisplayFormat: Localizer.get(`${formatLocalisePrefix}.SHORTDATE`),
                timeDisplayFormat: Localizer.get(`${formatLocalisePrefix}.SHORTTIME`),
                text: `${someDate.format(Localizer.get(`${formatLocalisePrefix}.SHORTDATE`))} ${someDate.format(Localizer.get(`${formatLocalisePrefix}.SHORTTIME`))}`
            },
            {
                id: 'SHORT_DATE_LONG_TIME',
                timeDisplayFormat: Localizer.get(`${formatLocalisePrefix}.LONGTIME`),
                dateDisplayFormat: Localizer.get(`${formatLocalisePrefix}.SHORTDATE`),
                text: `${someDate.format(Localizer.get(`${formatLocalisePrefix}.SHORTDATE`))} ${someDate.format(Localizer.get(`${formatLocalisePrefix}.LONGTIME`))}`
            },
            {
                id: 'CONDENSED_DATE_SHORT_TIME',
                dateDisplayFormat: Localizer.get(`${formatLocalisePrefix}.CONDENSEDDATE`),
                timeDisplayFormat: Localizer.get(`${formatLocalisePrefix}.SHORTTIME`),
                text: `${someDate.format(Localizer.get(`${formatLocalisePrefix}.CONDENSEDDATE`))} ${someDate.format(Localizer.get(`${formatLocalisePrefix}.SHORTTIME`))}`
            },
            {
                id: 'CONDENSED_DATE',
                dateDisplayFormat: Localizer.get(`${formatLocalisePrefix}.CONDENSEDDATE`),
                timeDisplayFormat: null,
                text: someDate.format(Localizer.get(`${formatLocalisePrefix}.CONDENSEDDATE`)),
                isDefault: true
            },
            {
                id: 'MONTH_DAY',
                timeDisplayFormat: null,
                dateDisplayFormat: Localizer.get(`${formatLocalisePrefix}.MONTHDAY`),
                text: someDate.format(Localizer.get(`${formatLocalisePrefix}.MONTHDAY`))
            },
            {
                id: 'YEAR_MONTH',
                timeDisplayFormat: null,
                dateDisplayFormat: Localizer.get(`${formatLocalisePrefix}.YEARMONTH`),
                text: someDate.format(Localizer.get(`${formatLocalisePrefix}.YEARMONTH`))
            },
            {
                id: 'DATE_ISO',
                timeDisplayFormat: null,
                dateDisplayFormat: Localizer.get(`${formatLocalisePrefix}.DATEISO`),
                text: someDate.format(Localizer.get(`${formatLocalisePrefix}.DATEISO`))
            },
            {
                id: 'DATE_TIME_ISO',
                timeDisplayFormat: Localizer.get(`${formatLocalisePrefix}.LONGTIME`),
                dateDisplayFormat: Localizer.get(`${formatLocalisePrefix}.DATEISO`),
                text: someDate.format()
            }
        ]
    });
}

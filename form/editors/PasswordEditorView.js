﻿/**
 * Developer: Krasnovskiy Denis
 * Date: 08/27/2015
 * Copyright: 2009-2015 Comindware®
 *       All Rights Reserved
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Comindware
 *       The copyright notice above does not evidence any
 *       actual or intended publication of such source code.
 */

/* global define, require, Handlebars, Backbone, Marionette, $, _, Localizer */

define(['text!./templates/passwordEditor.html', './TextEditorView'],
    function (template, TextEditorView) {
        'use strict';

        Backbone.Form.editors.Password = TextEditorView.extend({
            template: Handlebars.compile(template)
        });

        return Backbone.Form.editors.Password;
    });

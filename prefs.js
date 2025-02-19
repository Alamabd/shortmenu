import {ExtensionPreferences} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js'
import Gio from "gi://Gio"
import Adw from "gi://Adw"

export default class ShortMenuPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const page = new Adw.PreferencesPage({
            title: 'General',
            icon_name: 'dialog-information-symbolic',
        })
        window.add(page)

        const group = new Adw.PreferencesGroup({
            title: 'Appearance',
            description: 'Configure the appearance of the extension',
        });
        page.add(group);


        const idc = new Adw.SwitchRow({
            title: 'Show Indicator',
            subtitle: 'Whether to show the panel indicator',
        });
        const pro_name = new Adw.EntryRow({
            title: 'Set project name'
        })

        group.add(idc)
        group.add(pro_name)

        window._settings = this.getSettings()
        window._settings.bind(
            'show-indicator',
            group,
            'active',
            Gio.SettingsBindFlags.DEFAULT
        )
    }
}
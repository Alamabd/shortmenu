/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

import GObject from 'gi://GObject'
import St from 'gi://St'
import GLib from 'gi://GLib'
import Gio from 'gi://Gio'

import {Extension, gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js'
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js'
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js'

import * as Main from 'resource:///org/gnome/shell/ui/main.js'

const cmds = [
    {
        name: "kurumi 😍",
        cmd: "bash kurumi.sh"
    },
    {
        name: "Pcsx2 🕹️",
        cmd: "/opt/pcsx2/pcsx2-v2.2.0-linux-appimage-x64-Qt.AppImage"
    },
    {
        name: "Yt Downloader 🗃️",
        cmd: "/opt/ytdownloader/YTDownloader_Linux.AppImage  --no-sandbox"
    },
    {
        name: "Godot 🎮",
        cmd: "/opt/godot/Godot_v4.3-stable_linux.x86_64"
    }
]


const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {
    _init() {
        super._init(0.5, _('My Shiny Indicator'))

        this.add_child(new St.Label({
            text: _("Click Me"),
            style_class: 'indicator',
        }))

        // this.header = this.menu.addMenuItem("")
        // const title = new St.Label({
        //     text: _("Go Project 😍"),
        //     style_class: 'title'
        // })
        // this.header.actor.add_child(title)
        // this.header.setSensitive(false)

        
        cmds.forEach((val) => {
            let menuItem = new PopupMenu.PopupMenuItem(val.name)
            menuItem.connect('activate', () => {
                Main.notify("Go project 😍", `Open ${val.name} app`)
                GLib.spawn_command_line_async(val.cmd)
            })
            this.menu.addMenuItem(menuItem)
        })
    }
})

export default class IndicatorExampleExtension extends Extension {
    enable() {
        this._indicator = new Indicator()
        Main.panel.addToStatusArea(this.uuid, this._indicator, 0, 'left')


        // !!!!!-----prefs is still in the learning stage
        this._settings = this.getSettings()
        this._settings.bind('show-indicator', this._indicator, 'visible',
            Gio.SettingsBindFlags.DEFAULT)

        // Watch for changes to a specific setting
        this._settings.connect('changed::show-indicator', (settings, key) => {
            console.log(`${key} = ${settings.get_value(key).print(true)}`)
        })
    }

    disable() {
        this._indicator.destroy()
        this._indicator = null
    }
}

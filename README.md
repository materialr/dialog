# MaterialR Dialog

**@materialr/dialog**

[![Build Status](https://travis-ci.org/materialr/dialog.svg?branch=master)](https://travis-ci.org/materialr/dialog)
[![Coverage Status](https://coveralls.io/repos/github/materialr/dialog/badge.svg?branch=master)](https://coveralls.io/github/materialr/dialog?branch=master)
[![NSP Status](https://nodesecurity.io/orgs/materialr/projects/8099736c-8314-4109-bed7-1f248c170319/badge)](https://nodesecurity.io/orgs/materialr/projects/8099736c-8314-4109-bed7-1f248c170319)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Material dialog implementation for React

## Installation

```sh
$ npm install --save @materialr/dialog
```

## Demo

A full demo is available on the [MaterialR website](https://materialr.github.io/components/dialog)
showcasing all variants.

## Components

### Default export

```js
import Dialog from '@materialr/dialog';
```

**Props**

| Prop              | Type        | Required | Default   | Description                                              |
| ----------------- | ----------- | -------- | --------- | -------------------------------------------------------- |
| `body`            | string      | Yes      | N/A       | The text to display inside the dialog                    |
| `className`       | string      | No       | undefined | Additional classNames to add                             |
| `labelAccept`     | string      | Yes      | N/A       | The label for the accept button                          |
| `labelCancel`     | string      | Yes      | N/A       | The label for the cancel button                          |
| `onAccept`        | func        | Yes      | N/A       | The accept button handler                                |
| `onCancel`        | func        | Yes      | N/A       | The cancel button handler                                |
| `secondaryAccept` | bool        | No       | false     | Whether to use the secondary style for the accept button |
| `secondaryCancel` | bool        | No       | false     | Whether to use the secondary style for the cancel button |
| `scrollable`      | bool        | No       | false     | whether the body of the dialog has scrollable text       |
| `title`           | string      | Yes      | N/A       | The title of the dialog                                  |

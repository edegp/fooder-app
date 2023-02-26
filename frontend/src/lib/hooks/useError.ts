import { useCallback, useState } from 'react'

import { FirebaseError } from 'firebase/app'

import { isFirebaseError } from '../firebase'
import { getJpErrorMessage } from '../modules/getJpErrorMessage'

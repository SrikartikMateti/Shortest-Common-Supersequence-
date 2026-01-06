import express from 'express'

const app = express()

app.use(express.json())

const shortestCommonSupersequence = (str1 = '', str2 = '') => {
    const m = str1.length
    const n = str2.length
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1]
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }

    let i = m
    let j = n
    const ans = []

    while (i >= 1 && j >= 1) {
        if (str1[i - 1] === str2[j - 1]) {
            ans.push(str1[i - 1])
            i--
            j--
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            ans.push(str1[i - 1])
            i--
        } else {
            ans.push(str2[j - 1])
            j--
        }
    }

    while (i >= 1) {
        ans.push(str1[i - 1])
        i--
    }
    while (j >= 1) {
        ans.push(str2[j - 1])
        j--
    }

    return ans.reverse().join('')
}

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/scs', (req, res) => {
    const { first = '', second = '' } = req.body || {}

    if (typeof first !== 'string' || typeof second !== 'string') {
        return res.status(400).json({ error: 'first and second must be strings' })
    }

    const result = shortestCommonSupersequence(first, second)
    res.json({ result })
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})
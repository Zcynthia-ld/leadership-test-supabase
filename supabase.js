// Supabase配置
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

// 创建Supabase客户端
const supabase = supabase.createClient(supabaseUrl, supabaseKey)

// 示例：保存测评结果
async function saveTestResult(result) {
    try {
        const { data, error } = await supabase
            .from('test_results')
            .insert([
                {
                    user_id: result.userId,
                    test_date: new Date(),
                    gold_score: result.scores.gold,
                    wood_score: result.scores.wood,
                    water_score: result.scores.water,
                    fire_score: result.scores.fire,
                    earth_score: result.scores.earth,
                    primary_type: result.primaryType,
                    detailed_analysis: result.detailedAnalysis
                }
            ])
        
        if (error) throw error
        return data
    } catch (error) {
        console.error('Error saving test result:', error.message)
        throw error
    }
}

// 示例：获取用户历史测评结果
async function getUserHistory(userId) {
    try {
        const { data, error } = await supabase
            .from('test_results')
            .select('*')
            .eq('user_id', userId)
            .order('test_date', { ascending: false })
        
        if (error) throw error
        return data
    } catch (error) {
        console.error('Error fetching user history:', error.message)
        throw error
    }
}

// 导出函数供其他文件使用
export {
    saveTestResult,
    getUserHistory
} 
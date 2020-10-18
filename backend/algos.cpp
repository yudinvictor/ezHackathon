//#include <iostream>
#include <cmath>
#include <vector>
#include <algorithm>
#include <map>
#include <fstream>
#include <unordered_map>

using namespace std;

ifstream cin("input.txt");
ofstream cout("output.txt");

struct node {
    long long id;
    string name;

    long long start;
    long long st_earlier_shift;
    long long st_later_shift;

    long long duration;
    long long min_duration;
    long long cost_reduction_duration;

    bool is_big;

    node(long long _id = 0, string _name = "",
        long long _start = 0, long long _st_earlier_shift = 0, long long _st_later_shift = 0,
        long long _duration = 0, long long _min_duration = 0, long long _cost_reduction_duration = 0, bool _is_big = true) {

        id = _id;
        name = _name;

        start = _start;
        st_earlier_shift = _st_earlier_shift;
        st_later_shift = _st_later_shift;

        duration = _duration;
        min_duration = _min_duration;
        cost_reduction_duration = _cost_reduction_duration;

        is_big = _is_big;
    }
};

const long long inf = 1e9;

long long n;


long long get_penalty_shift_start(node& root, long long day) {
    if (day > root.start) {
        if (root.st_later_shift == -1) {
            return inf;
        }
        return (day - root.start) * root.st_later_shift;
    }

    if (day < root.start) {
        if (root.st_earlier_shift == -1) {
            return inf;
        }
        return (root.start - day) * root.st_earlier_shift;
    }
    return 0;
}

long long get_penalty_change_len(node& root, long long len) {
    if (len >= root.duration) {
        return 0;
    }
    if (root.cost_reduction_duration == -1) {
        return inf;
    }

    return (root.duration - len) * root.cost_reduction_duration;
}

long long MAX_DAY = 900;
long long MAX_CNT = 10000;

vector < vector < long long > > dp;
vector < vector < long long > > par;

void dfs(long long v, vector < vector < long long > >& g, vector < bool >& used, vector < node >& a) {
    used[v] = true;

    for (auto to : g[v]) {
        if (!used[to]) {
            dfs(to, g, used, a);
        }
    }

    node root = a[v];

    for (long long finish = 0; finish < MAX_DAY; finish++) {

        if (finish == 0) {
            dp[v][finish] = inf;
        }
        else {
            dp[v][finish] = dp[v][finish - 1];
            par[v][finish] = -1;
        }

        for (long long len = root.min_duration; len <= root.duration; len++) {

            long long start = finish - len;

            if (start < 0) continue;

            long long res = get_penalty_shift_start(root, start) + get_penalty_change_len(root, len);

            for (auto to : g[v]) {
                res += dp[to][finish - len];
            }
            if (res < dp[v][finish]) {
                dp[v][finish] = res;
                par[v][finish] = len;
            }
        }
    }

    return;
}


unordered_map < long long, pair < long long, long long > > hc;

void dfs_print(long long v, vector < vector < long long > >& g, vector < bool >& used, vector < node >& a, long long tt) {
    used[v] = true;

    while (par[v][tt] == -1) {
        tt--;
    }

    if (par[v][tt] == inf) return;

    long long len = par[v][tt];

    //cout << "Номер вершины \t Старт \t Факт старт \t Штрф.старт \t Норм.длина \t Факт длина \t Штрф. длины \n";

    cout << v << "\t\t" << a[v].start << "\t\t" << tt - len << "\t\t" << get_penalty_shift_start(a[v], (long long)tt - len) << "\t\t";
    cout << a[v].duration << "\t\t" << len << "\t\t" << get_penalty_change_len(a[v], len) << "\n";

    hc[v] = { tt - len, len };

    for (auto to : g[v]) {
        if (!used[to])
            dfs_print(to, g, used, a, tt - len);
    }     

    return;
}


int main() {
    cin >> n;
    vector < node > a(n);
    vector < vector < long long > > g(n);
    
    long long sumDur = 0;

    for (long long i = 0; i < n; i++) {
        long long id;
        string name;

        long long start;
        long long st_earlier_shift;
        long long st_later_shift;

        long long duration;
        long long min_duration;
        long long cost_reduction_duration;

        string flag;

        cin >> id >> name;
        cin >> start >> st_earlier_shift >> st_later_shift;
        cin >> duration >> min_duration >> cost_reduction_duration;
        cin >> flag;

        sumDur += duration;

        MAX_DAY = max(MAX_DAY, start + duration + 365);

        bool is_big = false;
        if (flag == "True") {
            is_big = true;
        }

        a[id] = { id, name, start, st_earlier_shift, st_later_shift, duration, min_duration, cost_reduction_duration, is_big };
    }

    MAX_CNT = n + 1;

    dp.assign(MAX_CNT, vector < long long >(MAX_DAY, inf));
    par.assign(MAX_CNT, vector < long long >(MAX_DAY, inf));

    long long m;
    cin >> m;

    long long root = n - 1;

    vector < pair < long long, long long > > e;

    for (long long i = 0; i < m; i++) {
        long long v, u;
        cin >> v >> u;
        g[u].push_back(v);
        e.push_back({ v, u });
    }

    vector < bool > used(n, false);

    for (long long i = 0; i < n; i++) {
        if (!used[i]) {
            dfs(i, g, used, a);
        }
    }

    vector < long long > opt;

    for (long long i = 0; i < MAX_DAY; i++) {
        if (dp[root][i] != inf) {
            if (i != 0 && (dp[root][i] == dp[root][i - 1])) {
                continue;
            }
            cout << i << " " << dp[root][i] << "\n";
            opt.push_back(i);
        }
    }

    
    for (long long i = 0; i < opt.size(); i++) {
        cout << opt[i] << "\n";
        vector < bool > used1(n, false);
        long long crit = 0;
        

        for (long long j = 0; j < m; j++) {
            long long v = e[j].first;
            long long u = e[j].second;

            if (a[u].is_big || a[v].is_big) {
                if (hc[u].first - hc[v].first + hc[v].second <= max(sumDur / 13, (long long)3)) {
                    crit++;
                }
            }
        }
        cout << crit * crit;
        cout << "\n";
        dfs_print(root, g, used1, a, opt[i]);
    }

}

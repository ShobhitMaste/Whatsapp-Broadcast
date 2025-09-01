


export default function Header(){
    async function handleLogout(){
        let ans = confirm("Are you Sure ? \nYou will have to login again.")
        if(ans) await window.electronAPI.logout();
    }
    return <div className="flexcenter mt-4">
        <h1>Whatsapp Broadcasting App</h1>
        <p className="flexcenter logoutButton" onClick={handleLogout}>Clear Cache</p>
    </div>
}

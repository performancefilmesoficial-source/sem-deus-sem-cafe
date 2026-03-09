import React from 'react';
import { Home, BookOpen, ListTodo, Sparkles } from 'lucide-react';

interface BottomNavProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'dashboard', label: 'Início', icon: Home },
        { id: 'bible', label: 'Bíblia', icon: BookOpen },
        { id: 'plan', label: 'Plano', icon: ListTodo },
        { id: 'reflections', label: 'Reflexões', icon: Sparkles },
    ];

    return (
        <nav className="bottom-nav">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                    >
                        <Icon size={24} />
                        <span>{tab.label}</span>
                    </button>
                );
            })}
        </nav>
    );
};

export default BottomNav;

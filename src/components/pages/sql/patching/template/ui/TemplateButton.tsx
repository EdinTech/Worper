const SearchingSqlButton: React.FC<{ onCopy: () => void }> = ({ onCopy }) => {
    return (
        <>
            <div style={{
                position: 'absolute',
                right: 32,
                transform: 'translateY(-10px)',
                opacity: 0.5,
            }}>
                <a onClick={onCopy}>copy</a>
            </div>
        </>
    )
}

export default SearchingSqlButton
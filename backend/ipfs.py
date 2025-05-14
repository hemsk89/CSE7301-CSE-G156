import subprocess

def upload_to_ipfs(file_path):
    ipfs_path = "C:\\Users\\heasi\\Downloads\\go-ipfs\\ipfs.exe"  # Use your actual IPFS path

    # Run IPFS command
    result = subprocess.run([ipfs_path, "add", file_path], capture_output=True, text=True)

    # Check if there’s an error
    if result.returncode != 0:
        raise Exception(f"IPFS Error: {result.stderr}")

    return result.stdout.split()[1]  # Extract the IPFS hash
